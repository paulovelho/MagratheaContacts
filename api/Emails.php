<?php

	require_once("./Authentication.php");

	class EmailsApi extends AuthenticationApi {

		private $server;
		public function __construct() { 
			$this->model = new Email();
			$this->service = new EmailControl();
		}

		public function All() {
			try {
				return $this->service->GetAll();
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function List() {
			try {
				$source = $this->Token();
				$data = $this->service->getFromSource($source->id);
				return $data;
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function GetField($data, $field, $default=false) {
			if(!empty(@$data[$field])) return $data[$field];
			if($default) return $default;
			throw new MagratheaApiException("missing parameter: [".$field."]", 400);
		}

		public function AddEmail() {
			try {
				$data = $this->GetPost();
				$source = $this->Token();
				$mail = new Email();
				$mail->source_id = $source->id;
				$mail->from = (empty(@$data["from"])) ? "".$source->name." <".$source->mail_from.">" : $data["from"];
				$mail->to = $this->GetField($data, "to");
				$mail->replyTo = $this->GetField($data, "reply_to", $mail->from);
				$mail->subject = $this->GetField($data, "subject");
				$mail->message = $this->GetField($data, "message");
				$mail->priority = $this->GetField($data, "priority", 50);
				$mail->content_type = $this->GetField($data, "content_type", 'text/plain');
				$mail->add_date = now();
				$mail->sent_status = 0;

				if(!empty($mail->email_to)){
					$mail_id = $mail->Insert();
					MagratheaLogger::Log("<---< Mail inserted: [id: ".$mail_id.", to: ".$mail->to."] <---<");
					return $mail;
				}
			} catch(MagratheaApiException $ex) {
				$ex->SetData($data);
				throw $ex;
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function Search() {
			try {
				$source = $this->Token();
				$to = $_GET["to"];
				$source = $source->id == -1 ? false : $source->id;
				return $this->service->searchMailTo($to, $source);
			} catch(MagratheaApiException $ex) {
				$ex->SetData($data);
				throw $ex;
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function Send() {
			try {
				$mail = $this->service->getEmailToSend();
				$response = $mail->Send();
				if($response["success"]) {
					MagratheaLogger::Log(">===> Sending mail: [id: ".$mail->id.", to: ".$mail->to."] >===>");
					return array('sent' => true, 'mail' => $mail, 'response' => $response);
				} else {
					$priority = $mail->priority;
					$priority --;
					$mail->priority = ($priority > 0) ? $priority : 0;
					$mail->Save();
					MagratheaLogger::Log(">===> Error mail: [id: ".$mail->id.", to: ".$mail->to."] >=> [".$reponse["error"]."] >===>");
					return array('sent' => false, 'mail' => $mail, 'response' => $response);
				}
			} catch(MagratheaApiException $ex) {
				$ex->SetData($data);
				throw $ex;
			} catch(Exception $ex) {
				throw $ex;
			}
		}

	}

?>
