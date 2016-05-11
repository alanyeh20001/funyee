require 'rails_helper'

describe SentencesController, type: :controller do
  before do
    # Create a sentence instance & associate with user
    @sentence = FactoryGirl.build(:sentence)
    @sentence.save
    
    # Get a new user from association & sign in
    new_user = @sentence.user
    login_user(new_user)
  end
  
  describe "when logged in" do
    it "should have a current_user" do
      expect(subject.current_user).to_not eq(nil)
    end
  end
  
  it "#index" do
    get :index
    expect(response).to have_http_status(200)
  end
  
  it "#new" do
    get :new
    expect(response).to have_http_status(200)
  end
  
  it "#edit" do
    get :edit, id: @sentence[:id]
    expect(response).to have_http_status(200)
  end
  
  describe "#create" do
    before do
      @sentence_params = { content: "test2", language: "English", is_question: true, user_id: 1, question_id: 1 }
    end
    
    it "create a new record" do
      expect{ post :create, sentence: @sentence_params }.to change{ Sentence.all.size }.by(1)
    end
    
    it "render success info on success" do
      post :create, sentence: @sentence_params
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("creation success")
    end
    
    it "render fail info on fail" do
      allow_any_instance_of(Sentence).to receive(:save).and_return(false)
      post :create, sentence: @sentence_params
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("creation fail")
    end
  end
  
  describe "#update" do
    before do
      @sentence_params = { content: "test3", language: "English", is_question: true, user_id: 1, question_id: 1 }
    end
    
    it "update a record" do
      post :update, sentence: @sentence_params, id: @sentence[:id]
      expect(Sentence.find(@sentence[:id])[:content]).to eq("test3")
    end
    
    it "render success info on success" do
      post :update, sentence: @sentence_params, id: @sentence[:id]
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("update success")
    end
    
    it "render fail info on fail" do
      allow_any_instance_of(Sentence).to receive(:save).and_return(false)
      post :update, sentence: @sentence_params, id: @sentence[:id]
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("update fail")
    end
  end
  
  describe "#destroy" do
    it "destroy a record" do
      expect{ delete :destroy, id: @sentence[:id] }.to change{ Sentence.all.size }.by(-1)
    end
    
    it "render success info on success" do
      delete :destroy, id: @sentence[:id]
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("destroy success")
    end
    
    it "render fail info on fail" do
      allow_any_instance_of(Sentence).to receive(:destroy).and_return(false)
      delete :destroy, id: @sentence[:id]
      parse_json = JSON(response.body)
      expect(parse_json["status"]).to eq("destroy fail")
    end
  end
end













