package com.saskcow.golf.controller;

import com.saskcow.golf.domain.Course;
import com.saskcow.golf.repository.CourseRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.isA;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
public class HomeControllerTest {

    @Mock
    private CourseRepository repo;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new HomeController(repo))
                .build();
    }

    @Test
    public void addCourse_shouldSaveTheCourse() throws Exception {
        Course result = new Course("123ABC", "Some Course", null);
        when(repo.save(isA(Course.class))).thenReturn(result);
        when(repo.findOne(result.getId())).thenReturn(result);

        mockMvc.perform(post("/courses")
                    .content("{\"name\":\"Some Course\", \"holes\": [{\"number\": 1, \"par\": 3}]}")
                    .contentType("application/json"))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "http://localhost/courses/" + result.getId()));

        mockMvc.perform(get("/courses/{id}", "id").param("id", result.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("name", equalTo("Some Course")));
    }

}