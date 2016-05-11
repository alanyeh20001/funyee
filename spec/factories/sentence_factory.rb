FactoryGirl.define do
  factory :sentence do
    content       "test1"
    is_question   true
    language      "Chinese"
    association :user, factory: :user, strategy: :build
  end
end
