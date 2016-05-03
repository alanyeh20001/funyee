require 'rails_helper'

describe SentencesController,type: :controller do
   before do
    login_user
  end
  
  context "when logged in" do
    it "should have a current_user" do
      expect(subject.current_user).to_not eq(nil)
    end
  end
  
  it "#index" do
    get :index
    expect(response).to have_http_status(200)
  end
end
