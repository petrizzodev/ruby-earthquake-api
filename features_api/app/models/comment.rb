class Comment < ApplicationRecord
    belongs_to :feature, foreign_key: 'feature_id'
    
    validates :body, presence: true
end
