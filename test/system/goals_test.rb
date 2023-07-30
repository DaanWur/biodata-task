require "application_system_test_case"

class GoalsTest < ApplicationSystemTestCase
  setup do
    @goal = goals(:one)
  end

  test "visiting the index" do
    visit goals_url
    assert_selector "h1", text: "Goals"
  end

  test "should create goal" do
    visit goals_url
    click_on "New goal"

    fill_in "Complemetionrate", with: @goal.complemetionRate
    fill_in "Description", with: @goal.description
    fill_in "Startingvalue", with: @goal.startingValue
    fill_in "Targetdate", with: @goal.targetDate
    fill_in "Targetvalue", with: @goal.targetValue
    fill_in "Timeframe", with: @goal.timeFrame
    click_on "Create Goal"

    assert_text "Goal was successfully created"
    click_on "Back"
  end

  test "should update Goal" do
    visit goal_url(@goal)
    click_on "Edit this goal", match: :first

    fill_in "Complemetionrate", with: @goal.complemetionRate
    fill_in "Description", with: @goal.description
    fill_in "Startingvalue", with: @goal.startingValue
    fill_in "Targetdate", with: @goal.targetDate
    fill_in "Targetvalue", with: @goal.targetValue
    fill_in "Timeframe", with: @goal.timeFrame
    click_on "Update Goal"

    assert_text "Goal was successfully updated"
    click_on "Back"
  end

  test "should destroy Goal" do
    visit goal_url(@goal)
    click_on "Destroy this goal", match: :first

    assert_text "Goal was successfully destroyed"
  end
end
