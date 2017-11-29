class Comment < ActiveRecord::Base
  belongs_to :post
  validates :body, length: {maximum: 40}, presence: true
  
  # return값이 40
  def self.MAX_LENGTH   
    40
  end
end
