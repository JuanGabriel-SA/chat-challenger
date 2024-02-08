package chat.api;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @PostMapping("/send-message")
    public boolean sendMessage(@RequestBody DadosMensagem dados) {
        return true;
    }
}
