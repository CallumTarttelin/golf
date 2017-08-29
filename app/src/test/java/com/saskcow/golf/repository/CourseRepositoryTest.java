package com.saskcow.golf.repository;

import com.saskcow.golf.GolfApplication;
import com.saskcow.golf.domain.Course;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {GolfApplication.class})
@ActiveProfiles("test")
public class CourseRepositoryTest {

    @Autowired
    private CourseRepository repo;

    @Test
    public void thingsThatGetSaved_canBeFoundAgain() {
        Course myLovelyCourse = new Course(null, "Billingshurst", null);
        repo.save(myLovelyCourse);
        Course foundCourse = repo.findOne(myLovelyCourse.getId());
        assertThat(foundCourse.getName()).isEqualTo(myLovelyCourse.getName());
    }
}