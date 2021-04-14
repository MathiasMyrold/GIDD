package IDATT2106.team6.Gidd.models;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Activity {
    @Id
    @Column(name = "activity_id")
    private int activityId;
    private String title;
    private Timestamp time;
    @Column(name = "days_to_repeat")
    private int daysToRepeat;
    @CascadeOnDelete
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private int userId;
    private int capacity;
    //Ikke laget klasse. Lar den være for nå
    @Column(name = "group_id")
    private int groupId;
    private String description;
    private byte[] image;
    @Column(name = "activity_level")
    private ActivityLevel activityLevel;
    @CascadeOnDelete
    @ManyToMany(targetEntity = Tag.class)
    private List<Tag> tags;
    @CascadeOnDelete
    @OneToMany(mappedBy = "Activity")
    private List<ActivityEquipment> equipments;
    private double latitude;
    private double longitude;
    @CascadeOnDelete
    @OneToMany(mappedBy = "Activity")
    private List<ActivityUser> registeredParticipants;

    //Kontruktør må fikses i forhold til hva man trenger
    public Activity(int id, String title, Timestamp time, int repeat, int userId, int capacity, int groupId, String description, int points, byte[] image, ActivityLevel activityLevel, List<Tag> tags, double latitude, double longitude, List<Equipment> equipments){
        this.activityId = id;
        this.title = title;
        this.time = time;
        this.daysToRepeat = repeat;
        this.userId = userId;
        this.capacity = capacity;
        this.groupId = groupId;
        this.description = description;
        this.image = image;
        this.activityLevel = activityLevel;
        this.tags = tags;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Activity(){}

    public int getActivityId() {
        return activityId;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getTime() {
        return time;
    }

    public int getDaysToRepeat() {
        return daysToRepeat;
    }

    public int getUserId() {
        return userId;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getGroupId() {
        return groupId;
    }

    public String getDescription() {
        return description;
    }

    public byte[] getImage() {
        return image;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
}