package chat.api.mensagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

@Service
public class ControladorDoChat {

    @Autowired
    private MensagemRepository repository;

    public void enviarMensagem(DadosMensagem dados) {
        repository.save(new Mensagem(dados));
    }
}

