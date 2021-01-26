import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Paper,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(5),
    borderRadius: 20,
  }
}));

const AddCardView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const postCard = async (input) => {
    fetch('http://localhost:3000/index_cards', {
      method: 'POST',
      body: JSON.stringify({
        id: input.question + input.answer,
        title: input.name,
        front: input.question,
        back: input.answer,
        subject: input.subject,
        link: input.link,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((response) => response.json());
    navigate('/');
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Paper className={classes.paper} variant="elevation" elevation={20}>
            <Formik
              initialValues={{
                question: '',
                name: '',
                subject: '',
                answer: '',
                link: '',
                policy: false
              }}
              validationSchema={
              Yup.object().shape({
                question: Yup.string().max(255).required('Question is required'),
                name: Yup.string().max(255).required('Name is required'),
                subject: Yup.string().max(255).required('Subject is required'),
                link: Yup.string().max(255).required('Link is required'),
                answer: Yup.string().max(255).required('answer is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
              onSubmit={() => {
                navigate('/register', { replace: true });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Add new card
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      as an anonymous user
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.subject && errors.subject)}
                    fullWidth
                    helperText={touched.subject && errors.subject}
                    label="Subject"
                    margin="normal"
                    name="subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subject}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.question && errors.question)}
                    fullWidth
                    helperText={touched.question && errors.question}
                    label="Question"
                    margin="normal"
                    name="question"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="question"
                    value={values.question}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.answer && errors.answer)}
                    fullWidth
                    helperText={touched.answer && errors.answer}
                    label="Answer"
                    margin="normal"
                    name="answer"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="answer"
                    value={values.answer}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.link && errors.link)}
                    fullWidth
                    helperText={touched.link && errors.link}
                    label="Link"
                    margin="normal"
                    name="link"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="link"
                    value={values.link}
                    variant="outlined"
                  />
                  <Box
                    alignItems="center"
                    display="flex"
                    ml={-1}
                  >
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      I have read the
                      {' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>
                      {errors.policy}
                    </FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={() => postCard(values)}
                    >
                      Add card now
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        </Container>

      </Box>
    </Page>
  );
};

export default AddCardView;
