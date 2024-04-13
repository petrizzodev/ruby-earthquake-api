class Feature < ApplicationRecord
    has_many :comments, foreign_key: 'feature_id'
end
