<?php

require("inc/global.php");
include($magrathea_path."/MagratheaServer.php");

//error_reporting(E_ALL ^ E_STRICT);

include("Models/Email.php");
include("Models/Source.php");

class ContactServer extends MagratheaServer{

/*
	public function getSources(){
		$sources = SourceControl::GetAll();
		$this->Json($sources);
	}
*/

	public function validateAuth($key){
		$secret = MagratheaConfig::Instance()->GetFromDefault("secret_key");
		if($key != $secret) {
			$this->Json(array("success" => false, "error" => 500, "message" => "Authorization failed.")); die;
		} else return true;
	}


	/**
	*	source = id da source a ser enviada
	*	to = email "to"
	*	from = email "from" (optional)
	*	replyto = email "replyto" (optional)
	*	subject = assunto do email
	*	message = mensagem
	*	priority = prioridade
	* 	key = auth key
	*/
	public function addMail(){
		$this->validateAuth($_POST["auth"]);

		$data = $_POST;
		try{
			$source = new Source($_POST["source"]);
		} catch(Exception $ex) {
			$this->Json(array("success" => false, "error" => 501, "message" => "Could not initialize source withi id ".$_POST["source"]));
		}
		$mail = new Email();
		$mail->source_id = $source->id;
		$mail->from = (empty($_POST["from"])) ? "".$source->name." <".$source->from.">" : $_POST["from"];
		$mail->to = $_POST["to"];
		$mail->replyTo = @$_POST["replyto"];
		$mail->subject = $_POST["subject"];
		$mail->message = $_POST["message"];
		$mail->priority = $_POST["priority"];
		$mail->content_type = (empty($_POST["content_type"])) ? 'text/plain' : $_POST["content_type"];
		$mail->add_date = now();
		$mail->sent_status = 0;

		if(!empty($mail->email_to)){
			$mail_id = $mail->Insert();
			MagratheaLogger::Log("<---< Mail inserted: [id: ".$mail_id.", to: ".$mail->to."] <---<");
			$this->Json(array("success" => true, "mail" => $mail));
		} else {
			$this->Json(array("success" => false, "error" => 600, "message" => "error getting the mail destiny"));
		}
	}

	public function sendMail(){
		$this->validateAuth($_GET["auth"]);
		$mail = EmailControl::getEmailToSend();
		if(!$mail) die("no mail to send...");
		$response = $mail->Send();
		if($response["success"]) {
			MagratheaLogger::Log(">===> Sending mail: [id: ".$mail->id.", to: ".$mail->to."] >===>");
		} else {
			$priority = $mail->priority;
			$priority --;
			$mail->priority = ($priority > 0) ? $priority : 0;
			$mail->Save();
			MagratheaLogger::Log(">===> Error mail: [id: ".$mail->id.", to: ".$mail->to."] >=> [".$reponse["error"]."] >===>");
		}
		$this->Json($response);
	}

	public function showSources(){
		$this->validateAuth($_GET["auth"]);
		header('Content-type: text/html; charset=utf-8');
		SourceControl::showAll();
	}
	public function showMails(){
		$this->validateAuth($_GET["auth"]);
		header('Content-type: text/html; charset=utf-8');
		EmailControl::showAll();
	}

}

$server = new ContactServer();
$server->AllowAll()->Start();


// cron job:
//
//	*/30 * * * * wget --delete-after -q http://contato.website.com.br/server.php?sendMail 
//



?>