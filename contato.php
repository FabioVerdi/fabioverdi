 <?php
		$to = "fabio@sachetto.com.br";
		$assunto = "Contato via Formulário" ;
		$nome = $_REQUEST['nome'] ;
		$email = $_REQUEST['email'] ;
		$telefone = $_REQUEST['telefone'] ;
		$message = $_REQUEST['message'] ;
		$from = $_REQUEST['email'] ;
		$headers = "Nome: \t$nome\r\n" . "E-mail: \t$email\r\n" . "Telefone: \t$telefone\r\n" . "Mensagem: \t$message\r\n";
		mail($to,$assunto,$headers);
		echo "OK";
?>
