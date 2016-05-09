class Sentence < ActiveRecord::Base
  validates :content, :language, :is_question, presence: true

  belongs_to :user
end
