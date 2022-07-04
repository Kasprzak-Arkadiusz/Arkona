﻿using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class AppUser : IdentityUser
{
    public string FirstName { get; private set; }
    public string LastName { get; private set; }

    public void SetName(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}