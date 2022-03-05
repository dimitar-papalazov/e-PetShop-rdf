package mk.ukim.finki.vbs.web.model.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super(String.format("Email %s does not exists", email));
    }
}
