class InvitationsController < ApplicationController
  def create
  	@invitation = Invitation.new invitation_params
    if @invitation.save
      ## use pusher to notify the other person
      flash[:notice] = ["Your invitation was successfully sent."]
      render json: @invitation
    else
      ## render error message
      flash[:alert] = ["Sorry, your invitation could not be processed."]
      render json: @invitation.errors.full_messages.to_json
    end
  end

  def destroy
  end

  private

  def invitation_params
    params.require(:invitation).permit(:recipient_id, :sender_id)
  end
end
