class SentenceLikesController < ApplicationController
  def create
    @sentence_like = current_user.sentence_likes.build(sentence_like_params)
    
    if @sentence_like.save
      sentence = Sentence.find(params[:sentence_id])
      sentence.like_counts += 1
      
      if sentence.save
        render json: { 
          status: "sentence_like create success" ,
          like_id: @sentence_like.id
        }
      else
        render json: { status: "sentence_like create fail" }
      end
    else
      render json: { status: "sentence_like create fail" }
    end
  end
  
  def destroy
    sentence_like = current_user.sentence_likes.find(params[:id])
    sentence_id = sentence_like.sentence_id
    
    sentence_like.destroy
    sentence = Sentence.find(sentence_id)
    sentence.like_counts -= 1
    
    if sentence.save
      render json: { status: "sentence_like destroy success" }
    else
      render json: { status: "sentence_like destroy fail" }
    end
  end
  
  private
  
  def sentence_like_params
    params.require(:sentence_like).permit(:sentence_id)
  end
end
