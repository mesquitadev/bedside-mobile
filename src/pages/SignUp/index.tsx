import React, {useRef, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
} from 'react-native';
import moment from 'moment';

import {PrimaryText, SecondaryText} from '../../styles';
import {Button, Input, Alert, InputMask} from '../../components';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {useNavigation} from '@react-navigation/native';
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);

  const cpfInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const rgInputRef = useRef<TextInput>(null);
  const streetInputRef = useRef<TextInput>(null);

  const numberInputRef = useRef<TextInput>(null);
  const complementInputRef = useRef<TextInput>(null);
  const neighbornHoodInputRef = useRef<TextInput>(null);
  const cityinputRef = useRef<TextInput>(null);
  const stateInputRef = useRef<TextInput>(null);

  interface FormData {
    name: string;
    cpf: string;
    birthday: string;
    email: string;
    password: string;
    rg: string;
    street: number;
    number: number;
    zip: string;
    complement: string;
    neighborhood: string;
    phone: string;
    city: string;
    state: string;
    type: string;
    permission: boolean;
  }

  const handleSave = useCallback(async (data: FormData) => {
    console.log('data', data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigat??rio')
          .email('Digite um e-mail v??lido'),
        password: Yup.string()
          .required('Senha obrigat??ria')
          .min(6)
          .typeError('A senha precisa ter no minimo 6 caracteres'),
        name: Yup.string().required('Nome Obrigat??rio'),
        cpf: Yup.string().required('CPF Obrigat??rio'),
        birthday: Yup.string().required('Data de nascimento obrigat??ria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      console.log('cep', data.zip.replace('-', ''));
      const newData = {
        name: data.name,
        cpf: data.cpf.replace(/[^0-9]/g, ''),
        birthday: moment(data.birthday, true).format('YYYY-MM-DD'),
        email: data.email,
        password: data.password,
        rg: data.rg,
        zip: data.zip.replace('-', ''),
        number: data.number,
        complement: data.complement,
        street: data.street,
        neighborhood: data.neighborhood,
        phone: data.phone,
        city: data.city,
        state: data.state,
        type: '1',
        permission: 'true',
      };
      console.log('data', newData);
      const response = await api
        .post('users', newData)
        .then(() => {
          setShowAlert(true);
          setErrorTitle('Sucesso!');
          setErrorMessage('Voc?? j?? pode fazer o login');
          setIsBack(true);
        })
        .catch((error) => {
          setShowAlert(true);
          setErrorTitle('Erro!');
          setErrorMessage(error.response.data.error);
          setIsBack(false);
        });

      return response;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, marginHorizontal: 10}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <PrimaryText
              textColor={'#04C7AD'}
              alignSelf={'flex-start'}
              fontSize={36}>
              Vamos come??ar?
            </PrimaryText>
            <SecondaryText textColor={'#04C7AD'} light fontSize={15}>
              Coloque abaixo os seus dados para realizarmos seu cadastro.
            </SecondaryText>
          </View>
          <Form ref={formRef} onSubmit={handleSave}>
            <Input
              label="Nome"
              autoCapitalize="words"
              name="name"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                cpfInputRef.current?.focus();
              }}
            />

            <InputMask
              label="CPF"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="cpf"
              type="cpf"
              returnKeyType="next"
              placeholder="000.000.000-00"
              onSubmitEditing={() => birthdayInputRef.current?.focus()}
            />

            <Input
              label="RG"
              ref={rgInputRef}
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="rg"
              placeholder="RG"
              returnKeyType="next"
            />

            <InputMask
              label="Data de Nascimento"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="birthday"
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder="00/00/0000"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              label="E-Mail"
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              label="Senha"
              secureTextEntry
              name="password"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => streetInputRef.current?.focus()}
            />
            <InputMask
              label="Telefone"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="phone"
              type="cel-phone"
              options={{
                format: '(00) 00000-0000',
              }}
              placeholder="(00) 00000-0000"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <InputMask
              label="CEP"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="zip"
              type="zip-code"
              options={{
                mask: '99999-999',
              }}
              placeholder="00000-000"
              returnKeyType="next"
              onSubmitEditing={() => streetInputRef.current?.focus()}
            />
            <Input
              label="Logradouro"
              ref={streetInputRef}
              autoCapitalize="none"
              name="street"
              placeholder="Logradouro"
              returnKeyType="next"
              onSubmitEditing={() => {
                numberInputRef.current?.focus();
              }}
            />
            <Input
              label="Numero"
              ref={numberInputRef}
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="number"
              placeholder="N??mero"
              returnKeyType="next"
              onSubmitEditing={() => {
                complementInputRef.current?.focus();
              }}
            />
            <Input
              label="Complemento"
              ref={complementInputRef}
              name="complement"
              placeholder="Complemento"
              returnKeyType="next"
              onSubmitEditing={() => {
                neighbornHoodInputRef.current?.focus();
              }}
            />
            <Input
              label="Bairro"
              ref={neighbornHoodInputRef}
              name="neighborhood"
              placeholder="Bairro"
              returnKeyType="next"
              onSubmitEditing={() => {
                cityinputRef.current?.focus();
              }}
            />
            <Input
              label="Cidade"
              ref={cityinputRef}
              name="city"
              placeholder="Cidade"
              returnKeyType="next"
              onSubmitEditing={() => {
                stateInputRef.current?.focus();
              }}
            />
            <Input
              label="UF"
              ref={stateInputRef}
              name="state"
              placeholder="Uf"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              backgroundColor="#E8237D"
              onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert
        show={showAlert}
        title={errorTitle}
        message={errorMessage}
        onConfirmPressed={() => {
          setShowAlert(false);
          isBack ? navigation.goBack() : null;
        }}
      />
    </>
  );
};

export default SignUp;
