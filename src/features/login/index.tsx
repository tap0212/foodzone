import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';
import SuperScreen from '../../components/SuperScreen';
import {BottomSlate} from '../../components/BottomSlate';
import Input from '../../components/InputField';
import {BasicButton} from '../../components/Buttons/Basic';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/resux';
import { useSelector } from 'react-redux';
import { ReduxApiStatus, User } from '../../types';
import { reduxStateSelector, updateUser, updateValidations, userSelector, validationsSelector } from '../../store/slices/appSlice';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user: User = useSelector(userSelector);
  const validations: { emailError: string; passwordError: string } =
    useSelector(validationsSelector);
  const reduxState: ReduxApiStatus = useSelector(reduxStateSelector);
  const [password, setPassword] = useState<string>('');

  const handleNextPress = () => {
    //
  };
  const getIsNextDisabled = () => {
    if (
      !user.email ||
      !password ||
      validations.emailError ||
      validations.passwordError ||
      reduxState === ReduxApiStatus.PENDING
    ) {
      return true;
    }
    return false;
  };
  const onChangeEmail = (text: string) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      dispatch(updateUser({ ...user, email: text }));
      dispatch(updateValidations({ ...validations, emailError: 'Invalid email!' }));
      return false;
    } else {
      dispatch(updateUser({ ...user, email: text, }));
      dispatch(updateValidations({ ...validations, emailError: '' }));
    }
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };
  return (
    <SuperScreen
      noBottomButton={true}
      mainContainerStyle={styles.mainContainerStyle}>
      <View style={styles.containerStyle}>
        <View style={styles.topContainer}>
          <View style={styles.container}>
            <View>
              <Text style={styles.welcomeText}>Get started</Text>
              <Text style={styles.mainText}>Get started</Text>
            </View>
          </View>
          <Text style={styles.mainText}>Get started</Text>
        </View>
        <BottomSlate
          footerComponent={
            <View style={styles.footer}>
              <BasicButton
                disabled={getIsNextDisabled()}
                text={'Next'}
                onPress={handleNextPress}
              />
            </View>
          }>
          <View style={styles.bottomContainer}>
            <Text style={styles.setupText}>Get startedc</Text>
            <Text style={styles.setupSubtileText}>Get started</Text>
            <View style={styles.inputContainer}>
              <Input
                error={validations.emailError}
                onChange={onChangeEmail}
                value={user.email as string}
                placeholderText={'Enter email'}
                type="email-address"
                design="filled"
              />
              <Input
                error={''}
                onChange={onChangePassword}
                value={password}
                placeholderText={'Enter password'}
                secureTextEntry={true}
                design="filled"
              />
            </View>
          </View>
        </BottomSlate>
      </View>
    </SuperScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'space-between',
    flex: 1,
  },
  mainContainerStyle: {
    padding: 0,
  },
  topContainer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    color: colors.white.DEFAULT,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '600',
  },
  welcomeText: {
    color: colors.black[10],
    fontSize: 14,
    textTransform: 'uppercase',
    lineHeight: 40,
    fontWeight: '600',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 32,
  },
  starBox: {
    position: 'absolute',
    right: 94,
  },
  bottomContainer: {
    backgroundColor: colors.black[70],
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  setupText: {
    color: colors.white.DEFAULT,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  setupSubtileText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.black[20],
  },
  footer: {
    marginHorizontal: 24,
    width: '100%',
  },
});
