#Command to execute task -> rake features_data:fetch_data

require 'net/http'
require 'json'

namespace :features_data do
  desc "Fetch seismic data from the USGS website and persist it in the database"
  task fetch_data: :environment do
    # Feed USGS URL (last 30 days)
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

    # Get feed data
    uri = URI(url)
    response = Net::HTTP.get(uri)

    # Parser data
    data = JSON.parse(response)

    # Process each feature (seismic event) in the data
    data["features"].each do |feature|
      properties = feature["properties"]
      geometry = feature["geometry"]
      
      # Extract relevant data from the feature
      external_id = feature["id"]
      mag = properties["mag"]
      place = properties["place"]
      time = properties["time"]
      url = properties["url"]
      tsunami = properties["tsunami"]
      magType = properties["magType"]
      title = properties["title"]
      longitude = geometry["coordinates"][0]
      latitude = geometry["coordinates"][1]

      # Validate data before persisting
      # Check non-null fields
      next if title.nil? || url.nil? || place.nil? || magType.nil? || longitude.nil? || latitude.nil?
      
      # Validate ranges
      next if mag < -1.0 || mag > 10.0
      next if latitude < -90.0 || latitude > 90.0
      next if longitude < -180.0 || longitude > 180.0
      
      # Check if the event already exists in the database to avoid duplicates
      existing_feature = Feature.find_by(external_id: external_id)
      
      # If the event does not exist, create a new record
      if existing_feature.nil?
        Feature.create!(
          external_id: external_id,
          mag: mag,
          place: place,
          time: time,
          url: url,
          tsunami: tsunami,
          magType: magType,
          title: title,
          longitude: longitude,
          latitude: latitude
        )
        puts "Seismic event recorded: #{title}"
      end
    end
    puts "Seismographic data acquisition and persistence process completed."
  end
end

