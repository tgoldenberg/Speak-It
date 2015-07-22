class InvitationsController < ApplicationController
  protect_from_forgery except: 'destroy'

  def create
  	@invitation = Invitation.new invitation_params
    if @invitation.save
      channel = 'private-conversation.' + @invitation.recipient_id.to_s
      data = {invitation: {invitation: @invitation, sender: @invitation.sender}}
      Pusher.trigger(channel, 'new_invitation', data.to_json)
      render json: "Your invitation was successfully sent.".to_json
    else
      flash[:alert] = ["Sorry, your invitation could not be processed."]
      render json: @invitation.errors.full_messages.to_json
    end
  end

  def recipient_decline
    invitations = Invitation.where(sender_id: invitation_params[:sender_id], recipient_id: invitation_params[:recipient_id], seen: false)
    invitations.each do |invitation|
      invitation.declined = true
      invitation.seen = true
      invitation.save
    end
    render json: "Declined".to_json
  end

  def recipient_miss
    invitation = Invitation.find_by(id: params[:id])
    invitation.missed = true
    invitation.save
    render json: "Missed".to_json
  end

  def sender_cancel
    invitation = Invitation.find_by(id: params[:id])
    invitation.destroy
    render json: "Call Cancelled".to_json
  end

  private

  def invitation_params
    params.require(:invitation).permit(:recipient_id, :sender_id, :seen, :declined, :missed)
  end
end
