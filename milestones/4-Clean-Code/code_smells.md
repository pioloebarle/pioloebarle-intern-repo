### Refactor Exercise

**Smelly Code**

```python
def prnt_notif(u_type, mins):
    # Magic Number 1440
    if u_type == "student":
        if mins > 1440: 
            print("You have been focused for more than a day!")
        else:
            print("Keep going student!")
    elif u_type == "worker":
        if mins > 1440:
            print("You have been focused for more than a day!")
        else:
            print("Keep going worker!")
    # print("Debugging u_type")
```

**Refactored Code**

```python
# Constants to eliminate Magic Numbers
MINUTES_PER_DAY = 1440

def send_focus_encouragement(user_role, focus_minutes):
    """
    Refactored to use Guard Clauses, Constants, and Clear Naming.
    """
    # Guard Clause to handle the long-duration case (eliminates nesting)
    if focus_minutes > MINUTES_PER_DAY:
        print("You have been focused for more than a day!")
        return

    # Simplified logic using a clean f-string (eliminates duplicate print calls)
    print(f"Keep going {user_role}!")
```

## Issue 56: Reflection

In the original code, I identified several code smells, this includes **Magic Numbers** (1440), **Duplicate Code** (the long-duration message), and **Inconsistent Naming**(`u_type`, `prnt_notif`). I also found out the **Commented-out line** which is not useful in running the code.

Refactoring replaced cryptic numbers with descriptive constants, making it immediately clear that `1440` refers to the minutes in a day. By using a **Guard Clause**, I flattened the logic, which makes the function easier to read from top to bottom without keeping track of multiple "else" branches.

When code is clean, bugs have fewer places to hide. For instance, if the Focus Bear team decides to change the notification threshold from 24 hours to 12 hours, I only have to update one constant (`MINUTES_PER_DAY`) instead of hunting down every instance of `1440` in the codebase. This reduces the risk of human error during updates.