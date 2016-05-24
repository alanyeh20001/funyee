class AddLikeCountsToSentences < ActiveRecord::Migration
  def change
    add_column :sentences, :like_counts, :integer
  end
end
