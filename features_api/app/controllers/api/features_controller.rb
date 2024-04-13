class Api::FeaturesController < ApplicationController
  before_action :set_feature, only: %i[ show update destroy ]
  DEFAULT_PER_PAGE = 20
  DEFAULT_PAGE = 1
  MAX_PER_PAGE = 1000

  # GET /features
  # GET /features
  def index
    mag_type_filter = params[:mag_type]
    page = params[:page] || DEFAULT_PAGE
    per_page = [(params[:per_page] || DEFAULT_PER_PAGE).to_i, MAX_PER_PAGE].min

    if mag_type_filter
      mag_types = mag_type_filter.split(',')
      @features = Feature.where(magType: mag_types).page(page).per(per_page)
    else
      @features = Feature.page(page).per(per_page)
    end

    formatted_features = @features.map do |feature|
        {
            id: feature.id,
            type: "feature",
            attributes: {
                external_id: feature.external_id,
                magnitude: feature.mag,
                place: feature.place,
                time: Time.at(feature.time / 1000.0).iso8601,
                tsunami: feature.tsunami > 0,
                mag_type: feature.magType,
                title: feature.title,
                coordinates: {
                    longitude: feature.longitude,
                    latitude: feature.latitude
                }
            },
            links: {
                external_url: feature.url
            }
        }
    end

    response = {
        data: formatted_features,
        pagination: {
            current_page: page,
            total: @features.total_count,
            per_page: per_page
        }
    }

    render json: response
  end

    # POST /features/:id/comments
  def create_comment
    
    feature_id = params[:feature_id]
      
    feature = Feature.find(feature_id)

    comment = feature.comments.new(body: params[:body])
  
    if comment.save
        render json: comment, status: :created
    else
        render json: comment.errors, status: :unprocessable_entity
    end
  end

  # GET /features/1
  def show
    render json: @feature
  end

  # POST /features
  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      render json: @feature, status: :created, location: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /features/1
  def update
    if @feature.update(feature_params)
      render json: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # DELETE /features/1
  def destroy
    @feature.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feature
      @feature = Feature.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feature_params
      params.require(:feature).permit(:id, :mag, :place, :time, :url, :tsunami, :magType, :title, :longitude, :latitude)
    end
end

