class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.datetime :targetDate
      t.string :description
      t.string :targetValue
      t.string :startingValue
      t.string :timeFrame
      t.string :complemetionRate

      t.timestamps
    end
  end
end
