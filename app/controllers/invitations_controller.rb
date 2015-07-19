class InvitationsController < ApplicationController
  protect_from_forgery except: 'destroy'

  def create
  	@invitation = Invitation.new invitation_params
    if @invitation.save
      flash[:notice] = ["Your invitation was successfully sent."]
      # define the channel to send the data through, to reach the other user
      channel = 'private-conversation.' + @invitation.recipient_id.to_s
      #compile data to send to other user through Pusher
      data = {invitation: @invitation, username: @invitation.sender.username}
      # trigger Pusher event with specific channel, event name, and data
      Pusher.trigger(channel, 'new_invitation', data.to_json)
      # render json for the sender
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
    # flash[:notice] = ["Invitation successfully deleted."]
    render json: "Deleted".to_json
  end

  private

  def invitation_params
    params.require(:invitation).permit(:recipient_id, :sender_id)
  end
end
