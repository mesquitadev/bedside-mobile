import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '../../styles';
import {Option, Button, Input, Alert, Loading} from '../../components/';
import styled from 'styled-components/native';
// import {Container} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

export const Container = styled.View`
  flex: 1;
  background: white;
`;

export const Header = styled.View`
  height: 80px;
  padding: 20px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const List = styled(FlatList)``;

export const ListItem = styled.TouchableOpacity`
  justify-content: center;
  height: 50px;
  flex: 1;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 2px;
  padding: 0px 10px;
`;

export const IconButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #e8237d;
  border-radius: 50px;
`;

export const Dependents: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [dependents, setDependents] = useState([]);

  useEffect(() => {
    api.get('/ousers').then((res) => {
      setDependents(res.data.ousers);
    });
  }, [navigation]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Container>
        <Header>
          <PrimaryText textColor="#40CCB2" alignSelf="flex-start" fontSize={30}>
            Dependentes
          </PrimaryText>
          <IconButton onPress={() => navigation.navigate('AddDependent')}>
            <Icon name="plus" size={30} color="#ffff" />
          </IconButton>
        </Header>
        <List
          data={dependents}
          keyExtractor={(dep) => dep.id}
          // ListHeaderComponent={}
          renderItem={({item: dep}) => (
            <ListItem>
              <PrimaryText textColor="black" alignSelf="flex-start">
                {dep.name}
              </PrimaryText>
            </ListItem>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Dependents;
