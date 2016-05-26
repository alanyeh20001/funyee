class SentencesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  
  def index
    question_ids = Sentence.select(:id).where(is_question: true).order(:created_at)
    sentences = Sentence.where(question_id: question_ids).order(question_id: :desc).order(:created_at)
    
    if current_user
      sentence_ids = sentences.select(:id) # for finding sentence liked ids
      sentences_liked = current_user.sentence_likes.select(:sentence_id, :id).where(id: sentence_ids)
      
      @sentences_liked = {}
      
      sentences_liked.each do |sentence_liked|
        @sentences_liked[sentence_liked[:sentence_id]] = sentence_liked[:id]
      end
    end

    @topics = []
    question_group = []
    id_check = nil
    
    sentences.each do |sentence|
      if sentence.question_id != id_check && id_check != nil
        @topics << question_group
        question_group = []
      end
      question_group << sentence
      id_check = sentence.question_id
    end
    @topics << question_group
    
    render json: {
              topics: @topics,
              sentences_liked: @sentences_liked
            }.to_json
  end
    
  def new
    @sentence = Sentence.new
    render json: @sentence
  end
  
  def create
    @sentence = current_user.sentences.build(sentence_params)
    
    if @sentence.save
      @sentence.update(question_id: @sentence.id) if @sentence.is_question == true
      
      @info = { status: "creation success" }
      render json: @info
    else
      @info = { status: "creation fail" }
      render json: @info
    end
  end
  
  def edit
    @sentence = current_user.sentences.find(params[:id])
    
    render json: @sentence
  end
  
  def update
    @sentence = current_user.sentences.find(params[:id])
    
    if @sentence.update(sentence_params)
      @info = { status: "update success" }
      render json: @info
    else
      @info = { status: "update fail" }
      render json: @info
    end
  end
  
  def destroy
    @sentence = current_user.sentences.find(params[:id])
    
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
