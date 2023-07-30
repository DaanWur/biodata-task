class Api::V1::GoalsController < ApplicationController
  before_action :set_goal, only: [:show, :edit, :update, :destroy]

  # GET /goals
  # GET /goals.json
  def index
    @goals = Goal.all.order(brand: :asc)
    render json: @goals
  end

  # GET /goals/1
  # GET /goals/1.json
  def show
    if @goal
      render json: @goal
    else
      render json: @goal.errors
    end
  end

  # GET /goals/new
  def new
    @goal = Goal.new
  end

  # GET /goals/1/edit
  def edit
  end

  # POST /goals
  # POST /goals.json
  def create
    @goal = Goal.new(goal_params)
    if @goal.save
      render json: @goal
    else
      render json: @goal.errors
    end
  end

  # PATCH/PUT /goals/1
  # PATCH/PUT /goals/1.json
  def update
  end

  # DELETE /goals/1
  # DELETE /goals/1.json
  def destroy
    @goal.destroy

    render json: { notice: 'Goal was successfully removed.' }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_goal
    @goal = Goal.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def goal_params
    params.permit(:targetDate, :description, :targetValue, :startingValue, :timeFrame, :complemetionRate, :created_at, :updated_at)
  end
end