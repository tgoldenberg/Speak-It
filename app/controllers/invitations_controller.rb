class InvitationsController < ApplicationController
  protect_from_forgery except: 'destroy'

  def create
  	@invitation = Invitation.new invitation_params
    if @invitation.save
      channel = 'private-conversation.' + @invitation.recipient_id.to_s
      data = {invitation: @invitation, username: @invitation.sender.username}
      Pusher.trigger(channel, 'new_invitation', data.to_json)
      render json: "Your invitation was successfully sent.".to_json
    else
      flash[:alert] = ["Sorry, your invitation could not be processed."]
      render json: @invitation.errors.full_messages.to_json
    end
  end

  def update
    invitation = Invitation.find_by(id: params[:invitation][:id])
    invitation.missed = true
    invitation.save
    render json: "Missed".to_json
  end

  def destroy
    invitations = Invitation.where(sender_id: invitation_params[:sender_id], recipient_id: invitation_params[:recipient_id])
    invitations.each do |invitation|
      invitation.declined = true
      invitation.seen = true
      invitation.save
    end
    render json: "Deleted".to_json
  end

  private

  def invitation_params
    params.require(:invitation).permit(:recipient_id, :sender_id, :seen, :declined, :missed)
  end
end
