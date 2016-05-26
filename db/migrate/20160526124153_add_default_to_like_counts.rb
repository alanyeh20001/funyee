class AddDefaultToLikeCounts < ActiveRecord::Migration
  def up
    change_column :sentences, :like_counts, :integer, default: 0
  end
  
  def down
    change_column :sentences, :like_counts, :integer, default: nil
  end
end
