package com.saskcow.golf.controller;


import com.saskcow.golf.domain.Course;
import com.saskcow.golf.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Controller
public class HomeController {

    private CourseRepository repo;

    @Autowired
    public HomeController(CourseRepository repo) {
        this.repo = repo;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("greeting", "You'll love our shiny courses");
        return "index";
    }

    @RequestMapping(value = "/courses", method = RequestMethod.POST)
    public ResponseEntity<?> saveCourse(@RequestBody Course course) {
        Course savedCourse = repo.save(course);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedCourse.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @RequestMapping(value = "/courses/{id}", method = RequestMethod.GET)
    public ResponseEntity<Course> findCourse(@RequestParam("id") String id) {
        Course course = repo.findOne(id);
        return ResponseEntity.ok(course);
    }
}
