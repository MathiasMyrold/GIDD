package IDATT2106.team6.Gidd.service;

<<<<<<< HEAD
import IDATT2106.team6.Gidd.models.User;
import IDATT2106.team6.Gidd.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
=======
import IDATT2106.team6.Gidd.models.ActivityLevel;
import IDATT2106.team6.Gidd.models.User;
import IDATT2106.team6.Gidd.repo.UserRepo;
>>>>>>> 88848c5 (login/register service + controller waiting for repo)
import org.springframework.stereotype.Service;
import java.util.Random;
@Service
public class UserService {
<<<<<<< HEAD
    @Autowired
    UserRepo repo;

    public void testNewUser(User user){
        repo.addUser(user);
    }

    public User getUser(int userId){
        return repo.findUser(userId);
    }
=======
    private UserRepo repo;

	public boolean login(String email, String password){
		return getUser(email).verifyPassword(password);
	}

    public User registerUser(String email, String password, String firstname, String surname,
	    int phoneNumber, ActivityLevel activityLevel){
	    //todo generate random number from 0 to maxint
	    Random rand = new Random();
		int id = rand.nextInt();
		User newUser = new User(id > 0 ? id : -id, email, password, firstname, surname, phoneNumber, activityLevel);
		//todo call repo to register this new user
		return newUser;
    }

	public User getUser(String email){
		//todo call repo here
		return null;	
	}
>>>>>>> 88848c5 (login/register service + controller waiting for repo)
}
