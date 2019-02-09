package com.example.siri.lab_assignment_2;

import android.app.ProgressDialog;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import android.content.Intent;


public class LoginActivity extends AppCompatActivity {
    private Button buttonRegister;
    private EditText editTextEmail;
    private EditText editTextPassword;
    private Button SignIn;
    private ProgressDialog progressDailog;
    String userID;

    private FirebaseAuth firebaseAuth;
    private FirebaseAuth.AuthStateListener firebaseAuthListener;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser(); //get the information of the current user
                if (user != null) {
                    //if not null, move to another activity, to be created later.
                    //Remember the current context!
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    intent.putExtra("user_id", user.getUid());
                    intent.putExtra("user_email", user.getEmail());
                    startActivity(intent);
                    finish();
                    return;
                }
            }
        };

        buttonRegister = (Button) findViewById(R.id.buttonRegister);
        editTextEmail = (EditText) findViewById(R.id.editTextEmail);
        editTextPassword = (EditText) findViewById(R.id.editTextPassword);

        SignIn = (Button) findViewById(R.id.SignIn);

        buttonRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String email = editTextEmail.getText().toString();
                final String password = editTextPassword.getText().toString();
                firebaseAuth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(LoginActivity.this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        //If user has already signed up, therefore the createUserWithEmailandPassword would fail.
                        if (!task.isSuccessful()) {
                            Toast.makeText(LoginActivity.this, "Registration Failed!", Toast.LENGTH_SHORT).show();
                        }
                        //If the user email cannot be found in the database, reference the database and add variables to it.
                        else {
                            userID = firebaseAuth.getCurrentUser().getUid();

                            DatabaseReference current_user_db = FirebaseDatabase.getInstance().getReference().child("Users").child(userID);
                            current_user_db.setValue(true);
                            current_user_db = FirebaseDatabase.getInstance().getReference().child("Users").child(userID).child("email");
                            current_user_db.setValue(email);
                            Toast.makeText(LoginActivity.this, "Registration Successful", Toast.LENGTH_SHORT).show();
                        }
                    }
                });

            }
        });

        SignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String email = editTextEmail.getText().toString();
                final String password = editTextPassword.getText().toString();
                firebaseAuth.signInWithEmailAndPassword(email, password).addOnCompleteListener(LoginActivity.this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (!task.isSuccessful()) {
                            Toast.makeText(LoginActivity.this, "Authentication Failed!", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
    @Override
    protected void onStart() {
        super.onStart();
        firebaseAuth.addAuthStateListener(firebaseAuthListener);
    }

    @Override
    protected void onStop() {
        super.onStop();
        firebaseAuth.removeAuthStateListener(firebaseAuthListener);
    }
}


