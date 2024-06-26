package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.Post;
import com.group13.DalTalks.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/getAllPost")
    public List<Post> getAllBooks(){
        return postService.getAllPost();
    }


    @GetMapping("/getPostById/{ID}")
    public Post getPostID(@PathVariable int ID){
        return postService.getPostById(ID);
    }
}
