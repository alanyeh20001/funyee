class CreateSentenceLikes < ActiveRecord::Migration
  def change
    create_table :sentence_likes do |t|
      t.integer :sentence_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
