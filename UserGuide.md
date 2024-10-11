### 1. Feature Overview:

Feature Name: Endorse Post
Purpose: This feature enables TAs and professors to endorse posts, notifying all viewers that the content has been approved or supported by a professor or TA. It offers students a clear and reliable indicator of posts containing verified, legitimate information that they should prioritize reading.
Coder: Evelynn Chen, Vicky Chen, and Alice Le

### 2. Steps to test feature
Step 1: Sign into an authorized account (Professor or TA account)
Step 2: Enter and click into a published post
Step 3: Click on the Endorse button


### 3. Expected Result:
The endorse button on the post will no longer be available until someone unendorses the post by clicking on unendorse
 (TA or Professor only)
Some sort of visual tag will appear on the post showing a TA or Professor has endorsed this post

### Automated Tests

### 1. Test Location
#### a.
**Location**: 
- test/posts.js, lines [135-165](https://github.com/CMU-313/nodebb-f24-boba/blob/f24/test/posts.js#L135-L165)

### 2. What is Being Tested
- **Tested Features**: The API for toggling the endorsed field for a Post.
- **Test Type**: Unit tests / back-end tests.

### 3. Coverage Justification
- **Coverage Justification**:
The tests cover all use cases of toggling the boolean field endorsed. By default, a post is not endorsed, and only one request to endorse/unendorse at a time should be processed. 

#### b.
**Location**: 
Location: test/posts/create.js in Alice/Feature-endorse branch

### 2. What is Being Tested
**Tested Features**: The creation of posts with the endorsed attribute, verifying default behavior (where endorsed is set to false) and the initialization of endorsed to true as specified by the user.
**Test Type**: Unit tests and back-end validation tests ensure that the endorsed field is handled correctly during post creation.

### 3. Why the Tests Are Sufficient
**Coverage Justification**: These tests cover critical scenarios around the endorsed attribute in post creation, ensuring both default and custom initialization works as intended. The default behavior test confirms that when endorsed is unspecified, the field defaults to false, maintaining standard post behavior. The specified behavior test validates that setting endorsed to true explicitly reflects in the backend data, demonstrating reliable customization.
**Edge Cases**: The tests handle potential edge cases, such as a null endorsed value or unexpected input, maintaining data integrity and preventing unauthorized attribute modification.
**Exclusion of Front-End Tests**: The tests are back-end focused, as UI interactions for post endorsement are manually validated. The primary emphasis remains on data accuracy in the database, which is critical for user-facing endorsement functionality.