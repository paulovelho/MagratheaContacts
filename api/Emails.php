<?php

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
				$source_id = $source->id == -1 ? false : $source->id;
				$page = @$_GET["page"];
				$data = $this->service->getFromSource($source_id, $page);
				return $data;
			} catch(Exception $ex) {
				throw $ex;
			}
		}

		public function GetField($data, $field, $default=false, $mandatory=true) {
			if(!empty(@$data[$field])) return $data[$field];
			if($default) return $default;
			if(!$mandatory) return null;
			throw new MagratheaApiException("missing parameter: [".$field."]", 400);
		}

		public function AddEmail() {
			try {
				$data = $this->GetPost();
				$source = $this->Token();
				$source_mail = $source->name." <".$source->mail_from.">";

				$mail = new Email();
				$mail->source_id = $source->id;
				$mail->subject = $this->GetField($data, "subject");
				$mail->message = $this->GetField($data, "message");
				$mail->priority = $this->GetField($data, "priority", 50);
				$mail->content_type = $this->GetField($data, "content_type", 'text/plain');
				$mail->add_date = now();
				$mail->sent_status = 0;

				$from = $this->GetField($data, "from", false, false);
				$to = $this->GetField($data, "to", false, false);

				if($from) {
					$mail->from = $from;
					$mail->replyTo = $from;
					$mail->to = $source->mail_from;
				} else if($to) {
					$mail->from = $source_mail;
					$mail->replyTo = $source_mail;
					$mail->to = $to;
				} else {
					throw new MagratheaApiException("Missing field [to] or [from]", 400);
				}

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

		public function Delete($params=false) {
			try {
				$source = $this->Token();
				if($source->id != -1) throw new MagratheaApiException("Only available for super admins", 401);
				return parent::Delete($params);
			} catch(Exception $ex) {
				throw $ex;
			}
		}

	}

?>
