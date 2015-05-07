require 'spec_helper'

describe Api::ReportsController do
  before(:each) do
    @report = create(:report, name: 'Teddy', date: '08/03/2015')
  end

  describe '#index' do
    it 'should return a json array of users' do
      get :index
      result = JSON.parse(response.body)

      expect(result[0]['date']).to eq('01/01/2015')
    end
  end

  describe "#update" do
    it 'should successfully respond to edits' do
      put :update, id: @report.id, report: {
            id: @report.id,
            name: 'Willie'
          }

      expect(response).to be_success
    end

    it "should change the report's name" do
      @report.update_attribute(:name, 'Testname')

      put :update, id: @report.id, report: {
            id: @report.id,
            name: 'Willie'
          }

      expect(@report.reload.name).to eq('Willie')
    end
  end
end