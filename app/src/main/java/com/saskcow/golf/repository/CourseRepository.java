package com.saskcow.golf.repository;


import com.saskcow.golf.domain.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, String>{

    Course findByName(String name);
}
