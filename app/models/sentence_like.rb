class SentenceLike < ActiveRecord::Base
  belongs_to :user
  belongs_to :sentence
end
