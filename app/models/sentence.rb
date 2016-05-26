class Sentence < ActiveRecord::Base
  validates :content, :language, presence: true

  belongs_to :user
  has_many :sentence_likes
  has_many :users, through: :sentence_likes
end
