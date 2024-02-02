package com.backend.todolist.Controller;

import com.backend.todolist.Repository.TodoRepository;
import com.backend.todolist.model.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin ("*")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoRepository.save(todo);
        return ResponseEntity.ok(savedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Todo> toggleComplete(@PathVariable Long id) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo != null) {
            todo.setCompleted(!todo.isCompleted());
            Todo updatedTodo = todoRepository.save(todo);
            return ResponseEntity.ok(updatedTodo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> editTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo != null) {
            todo.setTask(updatedTodo.getTask());
            todo.setDueDate(updatedTodo.getDueDate());
            todo.setEditing(updatedTodo.isEditing());
            Todo savedTodo = todoRepository.save(todo);
            return ResponseEntity.ok(savedTodo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
