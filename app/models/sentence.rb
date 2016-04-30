class Sentence < ActiveRecord::Base
  validates :content, :language, :is_question, presence: true
end
