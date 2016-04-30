class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.text :content
      t.string :language, limit: 15
      t.boolean :is_question
      t.integer :question_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
