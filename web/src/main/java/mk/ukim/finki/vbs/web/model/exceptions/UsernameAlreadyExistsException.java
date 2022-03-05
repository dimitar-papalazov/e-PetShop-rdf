package mk.ukim.finki.vbs.web.model.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{
    public UsernameAlreadyExistsException(String username) {
        super(String.format("Member with username: %s already exists", username));
    }
}
