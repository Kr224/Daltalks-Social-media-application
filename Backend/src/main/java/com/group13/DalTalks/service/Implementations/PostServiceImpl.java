package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.Post;
import com.group13.DalTalks.repository.PostRepository;
import com.group13.DalTalks.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Override
    public List<Post> getAllPost(){
        return (List<Post>)
                postRepository.findAll();
    }

    @Override
    public Post getPostById(int id){
        return postRepository.findById(id).get();

    }
}
