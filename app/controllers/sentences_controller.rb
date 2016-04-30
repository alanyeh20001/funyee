class SentencesController < ApplicationController
  def index
    @sentences = Sentence.all
    render json: @sentences
  end
    
  def new
    @sentence = Sentence.new
    render json: @sentence
  end
  
  def create
    @sentence = Sentence.new(sentence_params)
    
    if @sentence.save
      @info = { status: "creation success" }
      render json: @info
    else
      @info = { status: "creation fail" }
      render json: @info
    end
  end
  
  def edit
    @sentence = Sentence.find(params[:id])
    
    render json: @sentence
  end
  
  def update
    @sentence = Sentence.find(params[:id])
    
    if @sentence.update(sentence_params)
      @info = { status: "update success" }
      render json: @info
    else
      @info = { status: "update fail" }
      render json: @info
    end
  end
  
  def destroy
    @sentence = Sentence.find(params[:id])
    
    if @sentence.destroy
      @info = { status: "destroy success" }
      render json: @info
    else
      @info = { status: "destroy fail" }
      render json: @info
    end
  end
  
  private
  
  def sentence_params
    params.require(:sentence).permit(:content, :language, :is_question, :user_id, :question_id)
  end
end
