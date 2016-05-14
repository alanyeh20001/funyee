class Sentence < ActiveRecord::Base
  validates :content, :language, presence: true

  belongs_to :user
end
