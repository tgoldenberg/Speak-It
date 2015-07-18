class InvitationsController < ApplicationController
  def create
  	@invitation = Invitation.new invitation_params
    if @invitation.save
      ## use pusher to notify the other person
      flash[:notice] = ["Your invitation was successfully sent."]
      channel = 'private-conversation.' + @invitation.recipient_id.to_s
      data = {invitation: @invitation, username: @invitation.sender.username}
      Pusher.trigger(channel, 'new_invitation', data.to_json)
      render json: flash[:notice][0].to_json
    else
      ## render error message
      flash[:alert] = ["Sorry, your invitation could not be processed."]
      render json: @invitation.errors.full_messages.to_json
    end
  end

  def destroy
    invitation = Invitation.find_by(id: params[:invitation][:id])
    Invitation.where(sender_id: invitation.sender.id).delete_all
    flash[:notice] = ["Invitation successfully deleted."]
    render json: flash[:notice][0].to_json
  end

  private

  def invitation_params
    params.require(:invitation).permit(:recipient_id, :sender_id)
  end
end
