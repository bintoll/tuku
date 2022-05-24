import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from '../config/theme';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Components
import StarsRating from '../components/StarsRating';

// Import actions.
import * as productsActions from '../actions/productsActions';

const RATING_STAR_SIZE = 25;

const styles = EStyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: '$containerPadding',
  },
  ratingWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ratingAndCommentWrapper: {
    width: '100%',
  },
  input: {
    borderWidth: 0,
    borderColor: '#D1D5DB',
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 8,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: '#F1F1F4',
    height: 50,
    paddingTop: 13
  },
  inputBig: {
    height: 150
  },
  requiredInputDangerColor: {
    borderColor: '$dangerColor',
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20
  },
  ratingAndLabelWrapper: {

  },
  ratingText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22
  },
  ratingWrapper: {
  },
  sendReviewWrapper: {
    width: '100%',
    borderWidth: 1,
    height: 100,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#FE585B',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  sendButtonDisabled: {
    backgroundColor: '#848296',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export const WriteReviewNew = ({
  componentId,
  productId,
  productsActions,
  settings,
  fetchData,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState({
    advantages: '',
    disadvantages: '',
    comment: '',
  });
  const [requredFiledsNotice, setRequredFiledsNotice] = useState(false);

  const listener = {
    navigationButtonPressed: ({ buttonId }) => {
      if (buttonId === 'close') {
        Navigation.dismissModal(componentId);
      }
    },
  };

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: i18n.t('Write a Review'),
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });

    const listeners = Navigation.events().registerComponentListener(
      listener,
      componentId,
    );

    return () => {
      listeners.remove();
    };
  });

  const handleSendReview = async () => {
    if (!comment.comment.length) {
      setRequredFiledsNotice(true);
      productsActions.sendErrorNotification(
        i18n.t('Error'),
        i18n.t('Please fill in the required fields.'),
      );
      return;
    }

    await productsActions.sendReview({
      product_id: productId.toString(),
      rating_value: rating,
      ...comment,
    });
    await fetchData(productId);
    Navigation.dismissModal(componentId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingAndCommentWrapper}>
        {!settings.productReviewsAddon?.isCommentOnly && (
          <>
            <TextInput
              numberOfLines={3}
              multiline
              style={styles.input}
              value={comment.advantages}
              placeholder={i18n.t('Advantages')}
              placeholderTextColor={'#B3B3B3'}
              onChangeText={(value) => {
                setComment({ ...comment, advantages: value });
              }}
            />
            <TextInput
              numberOfLines={3}
              multiline
              style={styles.input}
              value={comment.input}
              placeholder={i18n.t('Disadvantages')}
              placeholderTextColor={'#B3B3B3'}
              onChangeText={(value) => {
                setComment({ ...comment, disadvantages: value });
              }}
            />
          </>
        )}
        <TextInput
          numberOfLines={3}
          multiline
          style={{
            ...styles.input,
            ...styles.inputBig,
            ...(requredFiledsNotice && styles.requiredInputDangerColor),
          }}
          value={comment.input}
          placeholder={`${i18n.t('Comment')}*`}
          placeholderTextColor={
            requredFiledsNotice ? theme.$dangerColor : '#B3B3B3'
          }
          onChangeText={(value) => {
            setRequredFiledsNotice(false);
            setComment({ ...comment, comment: value });
          }}
        />
      </View>
      <View style={styles.footerWrapper}>
        <View style={styles.ratingAndLabelWrapper}>
          <Text style={styles.ratingText}>Ваша оценка</Text>
          <View style={styles.ratingWrapper}>
            <StarsRating
              size={RATING_STAR_SIZE}
              value={rating}
              isRatingSelectionDisabled={false}
              onFinishRating={(value) => setRating(value)}
              containerStyle={styles.ratingWrapper}
              isEmpty={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.sendButton, !rating && styles.sendButtonDisabled]}
          disabled={!rating}
          onPress={() => handleSendReview()}>
          <Text style={styles.sendButtonText}>
            {i18n.t('Send review')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(
  (state) => ({
    settings: state.settings,
  }),
  (dispatch) => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  }),
)(WriteReviewNew);
